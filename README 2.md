# Netflix_Searching-Recommendation_Web
&lt;Database &amp; Information Systems> Final Project


## Git Commands
The easiest way to use github is through [Github Desktop](https://desktop.github.com/). But here are some commands that might be helpful in case of necessary.
#### 1. Clone the repository
```
git clone <http address of the repository>
```
```
git clone https://github.com/digital-biopsy/deep-segmentation.git
```
Github might prompt user to enter their token before access the repository. Setup instructions are [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Don't forget to take down the token somewhere.
#### 2. Create a branch
Creating a branch helps users to commit changes that haven't been fully tested.
1. Create a branch in local repository.
```
git branch checkout -b <your branch name>
```
```
git branch checkout -b dependency-fix
```
2. Push to the remote branch
Creating a branch locally would not chage the remote repository. The below command can push the new local branch to remote.
```
git push -u origin <a branch that not in the remote>
```
3. Switch to other branch.
All changes in the current branch need either be commited or stashed.
```
git checkout <an already existed branch>
```
#### 3. Git Commit and Stash
Git commit allow you to commit changes locally which git push save changes remotely.
1. Check current changes
git status will print out all the changed files.
```
git status
```
2. Git add
git add will add all changes but sometime its not desirable because it might also add dependencies or cache files.
```
git add .
```
```
git add <file path in the root directory and the file name>
```
3. Git commited
```
git commit -m "some commit message about the change"
```

4. Git Push
Push changes to remote branch. For the most of the time, remote names are just 'origin'
```
git push <remote name> <branch name>
```
5. Git pull
pull remote changes (collaborators' changes to local repo)
```
git pull
```

#### 4. Common workflow of committing to remote branch.
Create a new branch.
```
git branch checkout -b <your branch name>
```
Work on the changes.
Pull all the remote changes and solve conflicts locally.
```
git pull
```
Add changed files. Repeat this until add all the files.
```
git add <file name>
```
Commit changes
```
git commit -m "some commit message about the change"
```
Push the changes to new branch
```
git push -u origin <a branch that not in the remote>
```
or push to an existing branch.
```
git push origin <a branch that not in the remote>
```

## Datasets for this Project
1. [Netflix Prize Data](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data?select=README): It includes two files: combined_data.txt and movie_titles.csv. The combined_data.txt file contains information on movie ratings, including the movie ID, customer ID, rating, and date. The movie_titles.csv file contains information on the movie ID, year of release, and title.

2. [IMDB Dataset](https://www.imdb.com/interfaces/): It is a large dataset that contains the reviews, cast information, crews, genres, and ratings of over 50,000 of movies and tv series. The dataset contains 7 data files: "title.akas.tsv”, “title.basics.tsv”, “title.crew.tsv”, “title.episode.tsv”, “title.principals.tsv”, “title.ratings.tsv”, and “name.basics.tsv”. As we intend this project to provide users with Netflix TV series and movies rating statistics, we will primarily focus on using "title.akas.tsv”, “title.basics.tsv”, “title.episode.tsv”, “title.ratings.tsv”, “name.basics.tsv”. 

3. [48K IMDB Movies With Posters](https://www.kaggle.com/datasets/rezaunderfit/48k-imdb-movies-with-posters): It includes images with the IMDB movie identifiers, so that we can use these images for frontend display.

