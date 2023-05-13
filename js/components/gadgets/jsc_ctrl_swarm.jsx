export class CLSS_CTRL_SWARM extends React.Component {

    constructor(props)
	{
		super (props);
		
        this.state = {
        };

        window.AndruavLibs.EventEmitter.fn_subscribe(EE_BattViewToggle,this,this.fn_toggle_global);
    }

    fn_toggleMakeSwarm (p_formationID)
    {
        if (this.props.m_unit.m_Swarm.m_isLeader == true)
        {   // make not a leader
            v_andruavClient.API_makeSwarm (this.props.m_unit.partyID, CONST_TASHKEEL_SERB_NO_SWARM);
        }
        else
        {   // make leader and set formation.
            v_andruavClient.API_makeSwarm (this.props.m_unit.partyID, p_formationID);
        }
    }

    fn_updateSwarm(p_andruavUnit,leaderAndruavUnit)
    {
        v_andruavClient.API_updateSwarm (TASHKEEL_SERB_UPDATED, -1, p_partyID, p_leaderPartyID);
    }

    fn_requestToFollow (p_unit)
    {
        fn_console_log (p_unit);
        var v_partyID = null;
        var v_do_follow = CONST_TYPE_SWARM_UNFOLLOW;
        if (p_unit != null)
        {
            v_partyID = p_unit.partyID;
            v_do_follow = CONST_TYPE_SWARM_FOLLOW;
        }
        v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, v_partyID, v_do_follow);
    }


    onChange(e)
    {
       if (e.target.value)
       {
          if (e.target.value == "NA")
          {
              // do not follow
            v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, null);
          } 
          else
          {
            v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, e.target.value);
          }
       }
    }
    
    componentDidUpdate() 
    {
        if (this.props.m_unit.m_Swarm.m_following != null)
        {
            var leaderUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.m_unit.m_Swarm.m_following);
            if (leaderUnit != null)
            {
                $("#" + this.props.m_unit.partyID + "dldrselsel").val(leaderUnit.partyID);
            }
            else
            {
                $("#" + this.props.m_unit.partyID + "dldrselsel").val("NA");
            }
        }
        else
        {
            $("#" + this.props.m_unit.partyID + "dldrselsel").val("NA");
        }
    }

    
    render ()
    {
        if (CONST_FEATURE.DISABLE_SWARM === true)
        {
            return (
                <div></div>
            )
        }
        else
        {

            
                
        //CODEBLOCK_START
        var options = [];
        var v_units = v_andruavClient.m_andruavUnitList.fn_getUnitValues();
        var len = v_units.length;
        const c_items = [];
        
        var v_leader_class = "btn-secondry";
        var v_leader_title_leader   = "not leader";
        var v_leader_title_follower = "following none";
        var v_leader_dropdown_class = "bg-secondry";

        if (this.props.m_unit.m_Swarm.m_following != null)
        {
            v_leader_class = "btn-success"; // this state can be overwritten if it is a leader. 
            v_leader_dropdown_class = "bg-success text-white";
            var v_leaderUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.m_unit.m_Swarm.m_following);
            if (v_leaderUnit!=null) 
            { // [v_leaderUnit==null] maybe the web is loading and this unit has not been received yet.
                v_leader_title_follower = " following: "  + v_leaderUnit.m_unitName;
            }
            else
            {
                v_leader_title_follower = this.props.m_unit.m_Swarm.m_following; // add party_id
            }
            
        }

        if (this.props.m_unit.m_Swarm.m_isLeader === true)
        {
            v_leader_class = "btn-danger";
            v_leader_dropdown_class = "bg-danger text-white";
            v_leader_title_leader = "LEADER";
        }
        

        for (let i=0; i<len; ++i)
        {   
            var v_unit = v_units[i];

            /*
                It is not Me.
                It is a leader i.e. can be followed.
                It is not following me. -as leaders can be followers but should not be following me-.
                Notice: deeper circulaar error can be made and not handled here.
            */
            if ((this.props.m_unit.partyID != v_unit.partyID) 
            && (v_unit.m_Swarm.m_isLeader === true)  
            && (this.props.m_unit.m_Swarm.m_following != v_unit.partyID ))
            {
                var v_out = v_unit; // need a local copy 
                // list drones that are not me and are leaders.
                c_items.push(
                     <a key={v_unit.m_unitName+"s"} className="dropdown-item" href="#" onClick={() => this.fn_requestToFollow(v_out)}>{v_unit.m_unitName}</a>
                );     
            }
        }

        return (
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button id={this.props.m_unit.partyID + "_ldr"} 
                        type="button" 
                        className={"btn btn-sm " + v_leader_class} 
                        title={v_leader_title_leader + " / " + v_leader_title_follower}
                        onClick={() => this.fn_toggleMakeSwarm(CONST_TASHKEEL_SERB_THREAD)}>Leader</button>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop2" type="button" className="btn btn-success btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                        {c_items}
                        <a className="dropdown-item " href="#" onClick={() => this.fn_requestToFollow()}>unfollow</a>
                    </div>
                </div>
            </div>
        );
        //CODEBLOCK_END


        }
    }
}