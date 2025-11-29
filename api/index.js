import usersHandler from './users.js';
import authHandler from './auth.js';
import projectsHandler from './projects.js';
import contactsHandler from './contacts.js';
import qualificationsHandler from './education.js';

export default function handler(req, res) {
  const url = req.url;

  if (url.startsWith('/users')) return usersHandler(req, res);
  if (url.startsWith('/auth')) return authHandler(req, res);
  if (url.startsWith('/projects')) return projectsHandler(req, res);
  if (url.startsWith('/contacts')) return contactsHandler(req, res);
  if (url.startsWith('/education')) return qualificationsHandler(req, res);

  res.status(404).json({ error: 'Endpoint not found' });
}
