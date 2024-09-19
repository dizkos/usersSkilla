export interface StatusCallingProps {
  status: 'Не дозвонился' | 'Дозвонился';
  in_out: 1 | 0;
}

export type IconMapType = Record<
  `${StatusCallingProps['in_out']}-${StatusCallingProps['status']}`,
  string
>;

export interface getListFromDataProps {
  dateStart: string;
  dateEnd: string;
  in_out?: 1 | 0;
  sort_by? : 'date' | 'duration'
}
