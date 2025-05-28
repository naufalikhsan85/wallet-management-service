
const formatMessage = (
  messages: Record<string, string>,
  code: string,
  params: Record<string, string> = {}
): string =>{
  const template = messages[code];
  if (!template) return 'Unknown message code';

  let text = template;
  for (const [key, value] of Object.entries(params)) {
    text = text.replace(new RegExp(`{${key}}`, 'g'), value);
  }
  return text;
}

export {
    formatMessage
}