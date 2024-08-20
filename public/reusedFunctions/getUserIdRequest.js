export async function getUserId(username) {
    try {
        const response = await fetch('/getUserId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username})
        });
        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return response;
    } catch(error) {
        console.log(error);
        alert(error);
    }
}