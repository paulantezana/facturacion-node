const Tercero = require('../models/tercero');
const Auditoria = require('../models/auditoria');

const createTercero = async (req, res, next)=>{
    const tercero = new Tercero(req.body);
    await tercero.save();
    res.redirect('/tercero');
}

const updateTercero = async (req, res, next)=>{
    const { id } = req.params;
    const tercero = await Tercero.findByIdAndUpdate({_id: id},req.body);
    res.redirect('/tercero/view/' + tercero._id);
}

const allTerceros = async (req, res, next)=>{
    const terceros = await Tercero.find();
    const auditorias = await Auditoria.find();
    res.render('tercero', { title: 'Terceros', terceros, auditorias });
}

const deleteTercero = async (req, res, next)=>{
    const { id } = req.params;
    await Tercero.remove({_id: id});
    res.redirect('/tercero');
}

const viewTercero = async (req, res, next) => {
    const { id } = req.params;
    let tercero = await Tercero.findById({_id:id})
    const auditorias = await Auditoria.find();
    res.render('terceroedit', { title: 'Terceros', tercero, auditorias });
}

module.exports = {
    createTercero,
    updateTercero,
    allTerceros,
    deleteTercero,
    viewTercero
}