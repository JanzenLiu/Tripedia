module.exports = function(req, res){
	req.session.destroy();
    req.flash('success', 'Successfully Logout');
    res.redirect('/');
}
