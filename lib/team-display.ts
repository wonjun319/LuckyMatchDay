import type { TeamSlug } from "@/lib/types";

const TEAM_DISPLAY_NAMES: Record<TeamSlug, string> = {
  hanwha: "이글스",
  kia: "타이거즈",
  lg: "트윈스",
  doosan: "베어스",
  samsung: "라이온즈",
  lotte: "자이언츠",
  ssg: "랜더스",
  kt: "위즈",
  nc: "다이노스",
  kiwoom: "히어로즈"
};

const TEAM_NAME_ALIASES: Record<string, TeamSlug> = {
  "KIA Tigers": "kia",
  KIA: "kia",
  기아: "kia",
  "LG Twins": "lg",
  LG: "lg",
  엘지: "lg",
  "SSG Landers": "ssg",
  SSG: "ssg",
  "Doosan Bears": "doosan",
  Doosan: "doosan",
  두산: "doosan",
  "Samsung Lions": "samsung",
  Samsung: "samsung",
  삼성: "samsung",
  "Lotte Giants": "lotte",
  Lotte: "lotte",
  롯데: "lotte",
  "Hanwha Eagles": "hanwha",
  Hanwha: "hanwha",
  한화: "hanwha",
  "KT Wiz": "kt",
  KT: "kt",
  kt: "kt",
  "NC Dinos": "nc",
  NC: "nc",
  엔씨: "nc",
  "Kiwoom Heroes": "kiwoom",
  Kiwoom: "kiwoom",
  키움: "kiwoom"
};

export function getTeamDisplayName(slug: TeamSlug) {
  return TEAM_DISPLAY_NAMES[slug];
}

export function getDisplayNameFromTeamName(name: string) {
  const slug = TEAM_NAME_ALIASES[name];
  return slug ? TEAM_DISPLAY_NAMES[slug] : name;
}
