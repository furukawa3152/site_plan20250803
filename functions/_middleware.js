export async function onRequest(context) {
  const { request, env } = context;
  
  // Basic認証の設定
  const username = 'ocomoji';  // ユーザー名を変更してください
  const password = 'domaintest'; // パスワードを変更してください
  
  // Authorization ヘッダーを取得
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // Basic認証が要求される
    return new Response('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  }
  
  // Base64エンコードされた認証情報をデコード
  const encodedCredentials = authHeader.substring(6);
  const credentials = atob(encodedCredentials);
  const [providedUsername, providedPassword] = credentials.split(':');
  
  // 認証情報をチェック
  if (providedUsername === username && providedPassword === password) {
    // 認証成功 - 元のリクエストを処理
    return context.next();
  } else {
    // 認証失敗
    return new Response('認証に失敗しました', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  }
} 