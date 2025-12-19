export const addNoteIdToLocalstorage = (noteId: string) => {
    const existingIds = JSON.parse(localStorage.getItem('cipherId') || '[]')
    const updateIds = [...existingIds, noteId]
    localStorage.setItem('cipherId', JSON.stringify(updateIds))
    console.log(`Added ${noteId}`);
}