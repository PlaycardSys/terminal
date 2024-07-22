import {fetchWrapper} from '../../../helpers/fetch-wrapper';

export async function getPartyInfo(card_id: string) {
  const response = await fetchWrapper.get(`/cards/timecards/byId?card_id=${card_id}`);

  if (response.length > 0) {
    return response[0];
  }

  return [];
}

export async function getEvents(card_id: string) {
  return await fetchWrapper.get(`/cards/events/byId?card_id=${card_id}`);
}

export async function getType(card_id: string) {
  return await fetchWrapper.get(`/cards/cards/byId?card_id=${card_id}`);
}
