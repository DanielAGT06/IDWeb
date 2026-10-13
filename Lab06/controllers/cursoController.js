let cursos = require('../data/cursosData');

exports.getAllCursos = (req, res) => {
  const { creditos } = req.query;

  if (creditos) {
    const creditosNum = parseInt(creditos, 10);
    const filtrados = cursos.filter(c => c.creditos === creditosNum);
    return res.status(200).json({
      status: 'success',
      results: filtrados.length,
      data: filtrados
    });
  }

  res.status(200).json({
    status: 'success',
    results: cursos.length,
    data: cursos
  });
};

exports.getCursoById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const curso = cursos.find(c => c.id === id);

  if (!curso) {
    return res.status(404).json({
      status: 'fail',
      message: `No se encontró ningún curso con el ID ${id}`
    });
  }

  res.status(200).json({
    status: 'success',
    data: curso
  });
};
exports.createCurso = (req, res) => {
  const { nombre, codigo, creditos } = req.body;

  if (!nombre || !codigo || creditos === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Faltan campos obligatorios: nombre, codigo y creditos son requeridos'
    });
  }

  const newId = cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1;
  const newCurso = {
    id: newId,
    nombre,
    codigo,
    creditos: parseInt(creditos, 10)
  };

  cursos.push(newCurso);

  res.status(201).json({
    status: 'success',
    data: newCurso
  });
};

exports.updateCurso = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = cursos.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `No se encontró ningún curso con el ID ${id}`
    });
  }

  const { nombre, codigo, creditos } = req.body;

  cursos[index] = {
    ...cursos[index],
    ...(nombre && { nombre }),
    ...(codigo && { codigo }),
    ...(creditos !== undefined && { creditos: parseInt(creditos, 10) })
  };

  res.status(200).json({
    status: 'success',
    data: cursos[index]
  });
};

exports.deleteCurso = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = cursos.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `No se encontró ningún curso con el ID ${id}`
    });
  }

  cursos.splice(index, 1);

  res.status(200).json({
    status: 'success',
    message: `El curso con ID ${id} fue eliminado correctamente`
  });
};