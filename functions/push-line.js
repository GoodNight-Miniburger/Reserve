exports.handler = async function(event) {
  if(event.httpMethod !== 'POST'){
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const LINE_TOKEN = 'wilVYmOc+LsK6O6b765EsPpUruqs4mUZAVtSGcdEu3J9xt+CbxdkpqxH066zcJzgtrLULb2/HiVLpeYfrPLMfe48iW7tteA3S9blGZwfG/4QHqhnSXX5tWdMM9uo8eu2xgVPcHeXnBSqfCD3KKutFgdB04t89/1O/w1cDnyilFU=';

  try {
    const { userId, message } = JSON.parse(event.body);
    if(!userId || !message){
      return { statusCode: 400, body: 'Missing userId or message' };
    }

    const res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_TOKEN
      },
      body: JSON.stringify({
        to: userId,
        messages: [{ type: 'text', text: message }]
      })
    });

    const data = await res.json();
    return {
      statusCode: res.ok ? 200 : 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
};
