type prayBase = {
  title: string;
  state: string;
};

export type prayType = prayBase & {
  prayId: number;
  created: string;
  updated: string;
  sortNum: number;
};

export type prayPacket = prayBase & {};
