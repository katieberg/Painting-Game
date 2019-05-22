# Painting-Game
Nonogram Game
## App Purpose
Create multiple nonogram/picross/griddler puzzles that user can interact with and solve.
## Features
Display previews of solved and unsolved puzzles on side of the page, and one large puzzle to solve on the other side. User will be able to fill in cells (similar to the pixel paint project) and clear cells. 
Stretch Goal 1 - There should also be an option for the user to mark which cells they believe are empty that will not effect whether the solution is correct.
Stretch Goal 2 - when a user has the correct number of spaces filled in a row or column, the guide number will turn grey. If the number of spaces becomes incorrect, the guide number will turn black again.
## Bugs/Items to resolve
Need to add game rules to top of page for user.
Need to fix formatting on the column and row hint numbers - column hints should be displayed vertically. Row hints should have more space between numbers.
Need more puzzles, and a scrollbar on the thumbnails.
When mouse is dragged, the row hint items are selected. They shouldn't be. This causes issues with the click and drag to paint function because the mouse is trying to grab information from outside of the grid too. Possible solution is to put row hint items in a separate div column but would prefer not to do so.
Need to make the page look more cohesive - CSS issues.
