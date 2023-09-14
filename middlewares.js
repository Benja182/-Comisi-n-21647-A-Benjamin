const validateCreatePost = (req, res, next) => {
    const { title, content } = req.body;
  

// Comprueba si los campos 'title' y 'content' están presentes y no son nulos o vacíos
    if (!title || !content) {
      res.status(400).send('Los campos "title" y "content" son obligatorios.');
    } else {
      next();
    }
  };
  

// Función middleware para comprobar duplicados de publicaciones
  const checkDuplicatePost = async (req, res, next) => {
    try {
      const { title } = req.body;
  
      const existingPost = await Post.findOne({
        where: { title },
      });
  
      if (existingPost) {
        return res.status(409).send('Ya existe una publicación con el mismo título.');
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el middleware de comprobación de duplicados');
    }
  };


// Exportación de las funciones middleware para su uso en otros archivos
module.exports = {validateCreatePost, checkDuplicatePost}