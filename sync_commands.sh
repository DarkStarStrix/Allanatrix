# 1. Navigate to your project directory
cd C:\Users\kunya\PycharmProjects\Allanatrix

# 2. Initialize a new Git repository if you haven't already
git init

# 3. Add your local files to Git's tracking
git add .

# 4. Commit your local changes
# This saves a snapshot of your current work.
git commit -m "feat: save local brand and service updates"

# 5. Add the remote repository
# This command links your local repository to the one on GitHub.
# If you get an error that "origin" already exists, you can skip this command.
git remote add origin https://github.com/DarkStarStrix/Allanatrix

# 6. Fetch the content from the remote repository
git fetch origin

# 7. Merge the remote 'main' branch into your local branch.
# The '--allow-unrelated-histories' flag is needed because your local
# repository and the remote one were started independently.
git merge origin/main --allow-unrelated-histories

# After this command, Git may open a text editor for you to enter a merge commit message.
# You can usually accept the default message and close the editor.
# If there are any merge conflicts, Git will tell you which files need to be fixed.
# You will need to open those files, resolve the conflicts manually, and then commit the changes.

# 8. (Optional) Push your merged changes to GitHub
# This will update the remote repository with your local changes.
git push origin main

