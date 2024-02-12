# Waldo Api - The Odin Project

The Waldo API, part of The Odin Project, is a backend service designed to support a "Where's Waldo?" game clone. This API handles game logic, including managing game sessions, character data, and verifying user guesses. It serves as a robust backend built with Node.js and Express, showcasing RESTful API design principles.

[API Endpoint](https://lowly-famous-silica.glitch.me/)

[App Repo](https://github.com/AntonHarbers/Waldo-Clone-Frontend)

[App Live Link](https://main--odinwaldoclone.netlify.app/)

## Getting Started

To clone and set up the Waldo API for development:

1. Clone the repository:

```bash
git clone https://github.com/AntonHarbers/odin-waldo-api.git
```

2. Navigate to the project directory:

```bash
cd odin-waldo-api
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. For production, use:

```bash
npm start
```

## Key Concepts

### Express Middleware

The API leverages Express middleware for enhanced security and performance, including rate limiting, CORS, helmet, and compression.

**Example from `app.js`:**

```javascript
const limiter = RateLimit({
  windowsMs: 1 * 60 * 60 * 1000, // 1 hour
  max: 300,
});
app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'"],
    },
  })
);
app.use(compression());
```

### Mongoose Models

Utilizes Mongoose for MongoDB object modeling, defining schemas for game and character data.

**Character Model Example (`models/character_model.js`):**

```javascript
const CharacterSchema = new Schema({
  level: { type: Number, required: true },
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});
```

### RESTful Routes

Defines RESTful routes for managing games and characters, including middleware for admin authentication.

**Games Router Example (`routes/games_router.js`):**

```javascript
router.get('/', games_controller.get_games);
router.post('/', games_controller.post_game);
router.patch('/:id/time', games_controller.patch_game_time);
```

## API Endpoints Overview

- **GET `/games`**: Retrieve all games.
- **POST `/games`**: Start a new game.
- **PATCH `/games/:id/time`**: Update the finish time of a game.
- **GET `/characters`**: List all characters.
- **POST `/characters/:id`**: Verify character coordinates.

(Additional details about required data and headers for each endpoint can be found within the route and controller files.)

## Final Notes

Throughout the development of the Waldo API, I've gained invaluable insights into the workings of Express.js, MongoDB, and RESTful design principles. This project not only solidified my understanding of backend development but also demonstrated the real-world applications of these technologies in creating interactive web applications. The process has been both challenging and rewarding, offering hands-on experience with authentication, database schema design, and API rate limiting, among other aspects.

## Contribution Note

While I'm pleased to share this project as part of my portfolio, please note that contributions are not currently being accepted. You're welcome to clone and explore the repository for educational purposes.
