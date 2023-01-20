/* 
  This api is for sending whatsapp messages through infobip.
  This api url is called from mautic as follows

  API URL: https://educlaas.vercel.app/api/whatsapp

Headers:
    
   Access-Control-Request-Method: POST
  Content-Type: application/json
   api_key: <provide API KEY HERE>


{
    "sending_from": "6585333727",                                     // this is the registered phone number.
    "sending_to": "918754747960",                                     // the number of the person captured in the form 
    "template_name": "test2",                                              // the name of the template that you have created in infobip   
    "placeholder_one": "Jose",                                             //placeholder 1, this is a dynamic value that you need to pass from mautic to infobip
    "placeholder_two": "educlaas2",                                    //placeholder 2, this is a dynamic value that you need to pass from mautic to infobip 
    "language": "en_GB"                                                      //this refers to the template language that you created in infobip
}



*/

export default async function handler(req, res) {

    /* const sending_from = 6585333727
    const sending_to = 918754747960
    const template_name = 'test2'
    const placeholder_one = "Jose"
    const placeholder_two = "james"
    const language = "en_GB"
    const api_key  = "" */


    const {sending_from, sending_to, template_name, placeholder_one, placeholder_two, language} = req.body;
    const {api_key} = req.headers;
    console.log(api_key)

    if (req.method === 'POST') {
    const url = "https://jdv2pv.api.infobip.com/whatsapp/1/message/template"
    const payload = JSON.stringify({
            "messages": [
                {
                    "from": sending_from,
                    "to": sending_to,
                    "content": {
                        "templateName": template_name,
                        "templateData": {
                            "body": {"placeholders": [placeholder_one, placeholder_two]}
                        },
                        "language": language,
                    },
                }
            ]
        });        
        const headers = {
            "authorization": "App " + api_key,
            "Content-Type": "application/json",
        }
        try {
            const response = await fetch(url, { method: 'POST', headers, body: payload });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
  } else {
     res.status(200).json({ name: 'John Jeril' })
  }
 
}