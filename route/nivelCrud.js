const express = require("express");
const router = express.Router();
const CNivelServicio = require("../services/Snivel");
const NivelServicio = new CNivelServicio();

router.get("/List", async function(req, res, next) {
  try {
    const Tniveles = await NivelServicio.TraerTodos(
      "CALL USP_MDL_NIVEL_TT"
    ).then(niveles => {
      res.status(200).json({
        Resultado: niveles,
        mensaje: "Niveles listadas"
      });
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:Cod_Nivel", async function(req, res, next) {
  const { Cod_Nivel } = req.params;
  try {
    const TUmatricula = await NivelServicio.TraerUno(
      "CALL USP_MDL_NIVEL_TU(?)",
      [Cod_Nivel]
    ).then(nivel => {
      res.status(200).json({
        Resultado: nivel[0],
        message: "Nivel Lista"
      });
    });
  } catch (err) {
    next(err);
  }
});

router.post("/Guardar", async function(req, res, next) {
  const {
    Cod_Nivel,
    Cod_Criterio,
    Descripcion,
    Puntaje,
    PuntajeFinal,
    PuntajeObtenido    
  } = req.body;

  try {
    const GNivel = await NivelServicio.Guardar(
      "CALL USP_MDL_NIVEL_G(?,?,?,?,?,?)",
      [
        Cod_Nivel,
        Cod_Criterio,
        Descripcion,
        Puntaje,        
        PuntajeFinal,
        PuntajeObtenido,
      ]
    ).then(Nnivel => {
      res.status(201).json({
        Resultado: Nnivel,
        message: "Nivel guardado"
      });
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/Del", async function(req, res, next) {
  const { Cod_Nivel } = req.body;

  try {
    const Ematricula = await NivelServicio.Eliminar("CALL USP_MDL_NIVEL_E(?)", [
      Cod_Nivel
    ]).then(nivelE => {
      res.status(201).json({
        Resultado: nivelE,
        message: "Nivel eliminada"
      });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
