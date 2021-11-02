/* ********************************************************************************
*   Mohammad Hefny
*
*   26 Apr 2017
*
*********************************************************************************** */


var CLSS_CustomCircularBuffer = function (p_length)
{

    this.m_buffer = new Array(p_length);
    this.m_head = 0;
    this.m_tail = 0;
    this.m_unitCount =0;

    this.fn_add = function (p_toAdd, p_forgetOld,fn_onDeleteCallBack) 
    {
            if ((p_forgetOld == true) || (this.m_unitCount < this.m_buffer.length))
            {
                 if (this.m_buffer[this.m_head]!= null)
                 {
                    fn_onDeleteCallBack (this.m_buffer[this.m_head]);
                 }
                 this.m_buffer[this.m_head] = p_toAdd;
                 this.m_head +=1;
                 this.m_unitCount = (this.m_unitCount + 1) % this.m_buffer.length;
            }
            else
            {
                // invalid call
                throw "Buffer Overflow";
                
            }
            this.m_head = this.m_head % this.m_buffer.length;
    }

    this.fn_get = function (p_ignoreUnderFlow)
    {
        var t = null;
        if (this.m_unitCount ==0) return null;
        if (this.m_unitCount < this.m_buffer.length)
        {
            t = this.m_buffer[tail];
            this.m_tail +=1;
            this.m_tail = this.m_tail % this.m_buffer.length;
            this.m_unitCount = this.m_unitCount -1;
        }
        else
        {
             if (p_ignoreUnderFlow === false) {
                throw "Buffer Underflow";
               
            }
        }

        return t;
    }

    this.fn_flush = function ()
    {
        this.m_head = 0;
        this.m_tail = 0;
        this.m_unitCount =0;
    }

    this.toString = function ()
    {
         return "CLSS_CustomCircularBuffer(size=" + this.m_buffer.length + ", head=" + this.m_head + ", tail=" + this.m_tail + ")";
    }


    this.fn_bufferFull = function ()
    {
        return  (this.m_unitCount >= this.m_buffer.length);
    }
}

