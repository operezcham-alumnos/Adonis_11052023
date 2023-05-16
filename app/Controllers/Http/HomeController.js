const { Octokit } = require("@octokit/rest");


class HomeController {
  async index({ auth, view }) {
    const user = await auth.getUser()

    return view.render('welcome', {
      user: user || null
    })
  }

  async interaccion({ }) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN || '', // Usando process.env para acceder a la variable de entorno GITHUB_TOKEN
    });
    const fs = require('fs');
    const buff = fs.readFileSync('resources/views/hola.edge');
    const file = await octokit.repos.createOrUpdateFileContents({
      owner: 'operezcham-alumnos',
      repo: 'pruebasVasquezPolicarpo',
      path: 'hola',
      message: 'actualización',
      content: buff.toString('base64'),
      //sha: '...', // Asumiendo que tenemos el SHA del archivo existente (para actualizar)
    });
  }
}

module.exports = HomeController