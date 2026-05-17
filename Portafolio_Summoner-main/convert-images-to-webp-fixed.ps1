# Script to convert images to WebP format
# Downloads cwebp binary if not available and converts all JPG, JPEG, PNG images in the images directory

param(
    [string]$SourceDir = "C:\Users\user\OneDrive\Documentos\Portafolio_Bellas_Artes\Portafolio_Summoner-main\images",
    [string]$TempDir = "$env:TEMP\webp_conversion"
)

# Create temp directory
if (-not (Test-Path $TempDir)) {
    New-Item -ItemType Directory -Path $TempDir | Out-Null
}

# Download and extract cwebp if not already available
$cwebpPath = Join-Path $TempDir "libwebp-1.3.2-windows-x64\bin\cwebp.exe"
if (-not (Test-Path $cwebpPath)) {
    Write-Host "Downloading cwebp binary..."
    $zipPath = Join-Path $TempDir "webp.zip"
    try {
        Invoke-WebRequest -Uri "https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.3.2-windows-x64.zip" -OutFile $zipPath -UseBasicParsing
        Expand-Archive -Path $zipPath -DestinationPath $TempDir -Force
        Remove-Item $zipPath
        Write-Host "cwebp binary extracted to $TempDir"
    } catch {
        Write-Error "Failed to download or extract cwebp: $_"
        exit 1
    }
}

# Add cwebp directory to PATH for this session
$cwebpDir = Split-Path $cwebpPath
$env:PATH = "$cwebpDir;$env:PATH"

# Verify cwebp is available
if (-not (Test-Path $cwebpPath)) {
    Write-Error "cwebp.exe not found at $cwebpPath"
    exit 1
}

# Get all image files
$imageExtensions = @(".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG")
$imageFiles = Get-ChildItem -Path $SourceDir -Recurse -File | Where-Object { $imageExtensions -contains $_.Extension }

if ($imageFiles.Count -eq 0) {
    Write-Host "No image files found in $SourceDir"
    exit 0
}

Write-Host "Found $($imageFiles.Count) image(s) to convert..."

foreach ($imageFile in $imageFiles) {
    $webpFile = [IO.Path]::ChangeExtension($imageFile.FullName, ".webp")
    
    # Skip if WebP file already exists and is newer than source
    if (Test-Path $webpFile) {
        $sourceTime = (Get-Item $imageFile.FullName).LastWriteTime
        $webpTime = (Get-Item $webpFile).LastWriteTime
        if ($webpTime -ge $sourceTime) {
            Write-Host "Skipping $($imageFile.Name) (WebP is up to date)"
            continue
        }
    }
    
    # Convert image to WebP - Fixed argument passing using call operator with array
    $arguments = @("-q", "80", "`"$($imageFile.FullName)`"", "-o", "`"$webpFile`"")
    & $cwebpPath $arguments
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Converted: $($imageFile.Name)"
    } else {
        Write-Warning "Failed to convert $($imageFile.Name)"
    }
}

Write-Host "Conversion complete!"