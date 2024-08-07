export function convertUsername(username)
{
    return username?.toLowerCase().replace(/\s+/g, '-')
}
