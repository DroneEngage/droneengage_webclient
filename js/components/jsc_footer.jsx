class CLSS_FooterControl extends React.Component {
	constructor()
	{
        super ();
		this.state = {};
    }


    render()
    {
        const year = (new Date()).getFullYear();

        return (
            <footer className="text-center bg-4">
  
                <p className="user-select-none  text-white">© Copyright  2014-{year}, <a href={CONST_HOME_URL} className="a_nounderline a_hoverinvers"data-toggle="tooltip" title="DroneEngage">{CONST_TITLE}</a></p> 
    
            </footer>
        );
    }
}



ReactDOM.render(
    <CLSS_FooterControl  />,
    window.document.getElementById('footer_div')
);
