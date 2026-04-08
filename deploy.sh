#!/bin/bash

# Define paths
SYMLINK_PATH="./content"
REAL_CONTENT_PATH="G:\My Drive\Obsidian Vaults\DnD Campaign"
BACKUP_PATH="./content_backup"

# Step 1: Remove existing backup if any
if [ -d "$BACKUP_PATH" ]; then
  rm -rf "$BACKUP_PATH"
fi

# Step 2: Backup existing symlink (or directory)
if [ -L "$SYMLINK_PATH" ] || [ -d "$SYMLINK_PATH" ]; then
  mv "$SYMLINK_PATH" "$BACKUP_PATH"
fi

# Step 3: Copy real content to content folder (replace symlink with real files)
cp -r "$REAL_CONTENT_PATH" "$SYMLINK_PATH"

# Step 4: Run your build and deployment commands here
echo "Building and deploying..."
# npx quartz build
git add .
git commit -m "build: deploy with physical content"
git push
npx quartz sync --no-pull

# Step 5: Remove the physical content directory after deployment
rm -rf "$SYMLINK_PATH"

# Step 6: Restore the symlink
mv "$BACKUP_PATH" "$SYMLINK_PATH"

echo "Deployment done, symlink restored."