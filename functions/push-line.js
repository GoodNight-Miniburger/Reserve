export async function onRequestPost(context) {
  const LINE_TOKEN = 'wilVYmOc+LsK6O6b765EsPpUruqs4mUZAVtSGcdEu3J9xt+CbxdkpqxH066zcJzgtrLULb2/HiVLpeYfrPLMfe48iW7tteA3S9blGZwfG/4QHqhnSXX5tWdMM9uo8eu2xgVPcHeXnBSqfCD3KKutFgdB04t89/1O/w1cDnyilFU=';

  try {
    const { userId, message } = await context.request.json();
    if (!userId || !message) {
      return new Response('Missing userId or message', { status: 400 });
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
    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
