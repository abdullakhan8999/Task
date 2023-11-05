module.exports = errorHandler = (res, status, message) => {
   res.status(status).json({ message })
}