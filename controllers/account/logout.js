module.exports = function(req, res){
	req.session = null;
    req.flash('success', 'Successfully Logout');
    res.redirect('/');
}
