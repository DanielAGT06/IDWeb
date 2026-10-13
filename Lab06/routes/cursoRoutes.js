const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router
  .route('/')
  .get(cursoController.getAllCursos)
  .post(cursoController.createCurso);

router
  .route('/:id')
  .get(cursoController.getCursoById)
  .put(cursoController.updateCurso)
  .delete(cursoController.deleteCurso);

module.exports = router;