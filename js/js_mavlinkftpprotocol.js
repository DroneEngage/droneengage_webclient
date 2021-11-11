class C_MavlinkFTPProtocol
{
	
	constructor () 
	{
        this.m_reqesutParam = new Array (0,1,1,0,0,0,4,16,0,0,0,0,0,0,0,64,80,65,82,65,77,47,112,97,114,97,109,46,112,99,107);
        this.m_reqesutParam_reply = new Array (1,0,0,-128,4,4,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    }



    parseMavlinkGCS(p_mavlinkMessage, p_SendToGCS)
    {
        // FILE_TRANSFER_PROTOCOL Payload format - QGC
        // Byte Index	C version	Content	Value	Explanation
        // 0 to 1	uint16_t seq_number	Sequence number for message	0 - 65535	All new messages between the GCS and drone iterate this number. Re-sent commands/ACK/NAK should use the previous response's sequence number.
        // 2	uint8_t session	Session id	0 - 255	Session id for read/write operations (the server may use this to reference the file handle and information about the progress of read/write operations).
        // 3	uint8_t opcode	OpCode (id)	0 - 255	Ids for particular commands and ACK/NAK messages.
        // 4	uint8_t size	Size	0 - 255	Depends on OpCode. For Reads/Writes this is the size of the data transported. For NAK it is the number of bytes used for error information (1 or 2).
        // 5	uint8_t req_opcode	Request OpCode	0 - 255	OpCode (of original message) returned in an ACK or NAK response.
        // 6	uint8_t burst_complete	Burst complete	0, 1	Code to indicate if a burst is complete. 1: set of burst packets complete, 0: More burst packets coming.
        // - Only used if req_opcode is BurstReadFile.
        // 7	uint8_t padding	Padding		32 bit alignment padding.
        // 8 to 11	uint32_t offset	Content offset		Offsets into data to be sent for ListDirectory and ReadFile commands.
        // 12 to (max) 251	uint8_t data[]	Data		Command/response data. Varies by OpCode. This contains the path for operations that act on a file or directory. For an ACK for a read or write this is the requested information. For an ACK for a OpenFileRO operation this is the size of the file that was opened. For a NAK the first byte is the error code and the (optional) second byte may be an error number.

        const seq_number = p_mavlinkMessage.payload[0] + p_mavlinkMessage.payload[1] * 256;
        const session = p_mavlinkMessage.payload[2];
        const op_code = p_mavlinkMessage.payload[3];
        const size = p_mavlinkMessage.payload[4];
        const req_opcode = p_mavlinkMessage.payload[5];
        const burst_complete = p_mavlinkMessage.payload[6];
        const padding = p_mavlinkMessage.payload[7];
        const offset = p_mavlinkMessage.payload[8] * 256 * 256 * 256 + p_mavlinkMessage.payload[9] * 256 * 256 + p_mavlinkMessage.payload[10] * 256 + p_mavlinkMessage.payload[11];
        
        let op_name = "";
        
        if (burst_complete == 4) op_name = "create/open files";
        else if (burst_complete == 5) op_name = "read files";

        fn_console_log ("PARAMGCS: FTP seq_number:" + seq_number 
        + " session:" + session
        + " op_code:" + op_code
        + " size:" + size
        + " req_opcode:" + req_opcode
        + " burst_complete:" + burst_complete
        + " padding:" + padding
        + " offset:" + offset
        + " op_name:" + op_name
        );

        var v_good = true;
        for (var i =0; i < this.m_reqesutParam.length ; ++i)    
        {
            if (this.m_reqesutParam[i] != p_mavlinkMessage.payload[i])
            {
                v_good = false;
                break;
            }
        }

        if (v_good === true) 
        {
            fn_console_log ("PARAMGCS: Open Param File Request.");
            
            var v_payload = new Int8Array(this.m_reqesutParam_reply.length);
            for (var i=0;i<this.m_reqesutParam_reply.length;++i) 
            {
                v_payload[i] = this.m_reqesutParam_reply[i];
            }
            p_SendToGCS (v_payload);
        }
                     
    }
}