
export const fetchSearchId = async () => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Ошибка при получении searchId: ' + error.message);
  }
};


export const fetchTickets = async (searchId) => {
  try {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Ошибка при получении билетов: ' + error.message);
  }
};