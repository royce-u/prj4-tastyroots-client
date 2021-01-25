## MERN Auth Boilerplate (Client-side)

The master branch contains starter code. See solution branch for working version.

### Get Started

For local development

1. Fork and clone
2. Run `npm i` (run `npm audit fix` if needed - stuff changes a lot in React!)
3. Create a `.env.local` file at the top level 
4. Create an environment variable called REACT_APP_SERVER_URL set to the localhost server's url

#### Routes
Server side
| Method | Path | Purpose |
|--------|------|---------|
| POST | /auth/login | User authentication and login |
| POST | /auth/signup | User account creation |
| GET | /familiy/:id| Return a single family circle - @param id = ID of the family circle to return  |
| POST | /family| Create a new family circle |
| PUT | /family | Join a family circle|
| GET | /profile | Return all current user info |
| PUT |  /profile |Update user's profile (picture and bio) |
| GET |  /recipe/public  | Return all public recipes |
| GET | /recipe/:id | Return a specific recipe - @param id = ID of the recipe to return |
| GET | /recipe/user/:id | Return all recipes of a particular user - @param id = ID of current user |
| GET | /twist/:id | Return all twists from a particular recipe - @param id = ID of the original recipe |
| POST | /recipe | Add new recipe |
| PUT | /recipe/:id | Edit existing recipe - @param id = ID of the recipe to edit |
| PUT | /recipe/sharedWith/:id | Edit existing recipe to share/unshare with a family circle - @param id = recipe ID, @returns = Recipe with a specific recipe ID |

#### Routes
Client side
| Path | Purpose |
|--------|------|
| / | Homepage |
| /profile/edit | Edit user profile |
| /profile | User profile |
| /recipes | Public recipes |
| /familycircle | User's family circles |
| /recipe/:id/twist | Create twist off of a particular ID - @param id = ID of recipe to twist off of  |
| /recipe/:id | Recipe show page |
| /family/:id | Family show page |


