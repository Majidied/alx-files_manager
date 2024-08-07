import SHA1 from 'sha1';
import dbClient from '../utils/db';

/**
 * Controller class for handling user-related operations.
 */
class UsersController {
/**
 * Create a new user.
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Object} The response object containing the user's information.
 */
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).send({ error: 'Missing email' });
    }

    if (!password) {
      return response.status(400).send({ error: 'Missing password' });
    }

    const user = await dbClient.usersCollection.findOne({ email });

    if (user) {
      return response.status(400).send({ error: 'Already exist' });
    }

    const result = await dbClient.usersCollection.insertOne({ email, password: SHA1(password) });

    return response.status(201).send({ id: result.insertedId, email });
  }
}

export default UsersController;
