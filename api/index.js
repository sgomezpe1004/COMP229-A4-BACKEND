import authHandler from './auth.js';
import usersHandler from './users.js';
import projectsHandler from './projects.js';
import contactsHandler from './contacts.js';
import qualificationsHandler from './qualifications.js';

export default async function handler(req, res) {
  const path = req.url.split('?')[0]; 

  if (path.startsWith('/auth')) return authHandler(req, res);
  if (path.startsWith('/users')) return usersHandler(req, res);
  if (path.startsWith('/projects')) return projectsHandler(req, res);
  if (path.startsWith('/contacts')) return contactsHandler(req, res);
  if (path.startsWith('/qualifications')) return qualificationsHandler(req, res);

  res.status(404).json({ error: 'Endpoint not found' });
}
