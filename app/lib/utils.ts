export const addNoteIdToLocalstorage = (noteId: string) => {
    const existingIds = JSON.parse(localStorage.getItem('cipherId') || '[]')
    const updateIds = [...existingIds, noteId]
    localStorage.setItem('cipherId', JSON.stringify(updateIds))
    console.log(`Added ${noteId}`);
}

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

export const DUMMY_DATA = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nulla gravida orci."
export const DUMMY_DATE = "Jan 00, 0000, 00:00 AM"