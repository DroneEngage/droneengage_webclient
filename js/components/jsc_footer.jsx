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
  
                <p className="user-select-none  text-white"><a href="http://cloud.ardupilot.org" className="a_nounderline a_hoverinvers"data-toggle="tooltip" title="cloud.ardupilot.org">cloud.ardupilot.org</a> 2014-{year}</p> 
    
            </footer>
        );
    }
}



ReactDOM.render(
    <CLSS_FooterControl  />,
    v_G_getElementById('footer_div')
);
