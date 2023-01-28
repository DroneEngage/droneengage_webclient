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
  
                <p className="user-select-none  text-white">© Copyright  2014-{year}, <a href="http://DroneEngage.com" className="a_nounderline a_hoverinvers"data-toggle="tooltip" title="DroneEngage">DroneEngage</a></p> 
    
            </footer>
        );
    }
}



ReactDOM.render(
    <CLSS_FooterControl  />,
    v_G_getElementById('footer_div')
);
