export default function apiResponse(req,res) {
  return res.status(500).json({message: "No habilitado"});
}