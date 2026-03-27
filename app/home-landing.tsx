"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import {
  LuChevronRight,
  LuCrosshair,
  LuMapPinned,
  LuNfc,
  LuRefreshCcw
} from "react-icons/lu";

const baseViews = [
  {
    id: "home",
    label: "홈",
    title: "출발 시점",
    shortLabel: "Home",
    description: "왼쪽 아래 홈플레이트를 크게 당겨 시작 화면처럼 보여줍니다.",
    status: "초기 화면은 홈베이스를 크게 잡아, 경기장에 막 입장한 장면처럼 보이도록 맞췄습니다.",
    focus: { x: 17.4, y: 80.4, scale: 3.45 }
  },
  {
    id: "first",
    label: "1루",
    title: "우측 베이스",
    shortLabel: "1B",
    description: "오른쪽 파울 라인을 따라 1루 쪽으로 시점이 미끄러지듯 이동합니다.",
    status: "1루 시점은 홈에서 오른쪽으로 길게 뻗는 베이스라인이 살아나도록 이동합니다.",
    focus: { x: 39.1, y: 79.8, scale: 3.1 }
  },
  {
    id: "second",
    label: "2루",
    title: "중앙 베이스",
    shortLabel: "2B",
    description: "내야 중앙 쪽으로 파고들며 2루 주변 공간이 자연스럽게 드러납니다.",
    status: "2루 시점은 내야 한가운데로 모여드는 느낌을 주도록 약간 더 넓게 잡았습니다.",
    focus: { x: 39.3, y: 55.8, scale: 2.95 }
  },
  {
    id: "third",
    label: "3루",
    title: "좌측 베이스",
    shortLabel: "3B",
    description: "왼쪽 세로 라인을 타고 올라가며 3루 쪽으로 시야가 이동합니다.",
    status: "3루 시점은 세로 파울 라인을 따라 위로 끌어올리는 감각이 나도록 조정했습니다.",
    focus: { x: 17.8, y: 56.2, scale: 3.1 }
  }
] as const;

type HomeLandingProps = {
  errorMessage: string | null;
};

type BaseView = (typeof baseViews)[number];
type BaseId = BaseView["id"];

const baseViewMap = Object.fromEntries(baseViews.map((view) => [view.id, view])) as Record<
  BaseId,
  BaseView
>;

function getNextBaseId(currentBase: BaseId) {
  const currentIndex = baseViews.findIndex((view) => view.id === currentBase);
  const nextIndex = (currentIndex + 1) % baseViews.length;

  return baseViews[nextIndex].id;
}

export default function HomeLanding({ errorMessage }: HomeLandingProps) {
  const [currentBase, setCurrentBase] = useState<BaseId>("home");

  const activeView = baseViewMap[currentBase];
  const nextBaseId = getNextBaseId(currentBase);
  const nextView = baseViewMap[nextBaseId];

  const cameraStyle = {
    transform: `translate(${50 - activeView.focus.x * activeView.focus.scale}%, ${
      50 - activeView.focus.y * activeView.focus.scale
    }%) scale(${activeView.focus.scale})`
  } satisfies CSSProperties;

  return (
    <main className="landing-shell">
      <section className="landing-stage">
        <div className="landing-field">
          <button
            type="button"
            className="landing-camera"
            onClick={() => setCurrentBase(nextBaseId)}
            aria-label={`현재 ${activeView.label} 시점입니다. 클릭하면 ${nextView.label} 시점으로 이동합니다.`}
          >
            <div className="landing-camera__viewport">
              <div className="landing-camera__track" style={cameraStyle}>
                <Image
                  src="/baseball/baseball.jpg"
                  alt="야구장 베이스 이미지"
                  fill
                  priority
                  sizes="(max-width: 1180px) 100vw, 72vw"
                  className="landing-camera__image"
                />
              </div>

              <div className="landing-camera__shade" aria-hidden="true" />
              <div className="landing-camera__reticle" aria-hidden="true">
                <span className="landing-camera__reticle-dot" />
              </div>
            </div>

            <div className="landing-field__copy">
              <div className="landing-field__eyebrow">
                <span className="landing-field__eyebrow-badge">{activeView.shortLabel}</span>
                <span>Camera Focus</span>
              </div>

              <div className="landing-field__headline">
                <p className="landing-label">LuckyMatchDay</p>
                <h1>실제 야구장 이미지를 기준으로 베이스별 시점을 이동합니다.</h1>
                <p>
                  시작은 홈베이스 확대 화면입니다. 필드를 누르면 {nextView.label} 쪽으로 시점이
                  이어지고, 패널에서 원하는 베이스를 바로 선택할 수도 있습니다.
                </p>
              </div>

              <div className="landing-field__hint">
                <LuChevronRight />
                <span>
                  현재 {activeView.label} 시점. 클릭하면 {nextView.label} 시점으로 이동
                </span>
              </div>
            </div>
          </button>
        </div>

        <aside className="landing-panel">
          <div className="landing-panel__intro">
            <div className="landing-panel__eyebrow">
              <LuNfc />
              <span>Base Camera</span>
            </div>
            <h2>홈, 1루, 2루, 3루를 실제 이미지 좌표에 맞춰 카메라처럼 이동시켰습니다.</h2>
            <p>
              왼쪽 아래는 홈, 오른쪽은 1루, 가운데 위쪽은 2루, 왼쪽은 3루 기준으로 잡았습니다.
              지금은 선택한 베이스를 화면 중앙에 두고 확대하는 방식으로 동작합니다.
            </p>
          </div>

          {errorMessage ? (
            <div className="landing-alert">
              <strong>태그 확인 필요</strong>
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <div className="landing-basegrid" role="tablist" aria-label="베이스 시점 선택">
            {baseViews.map((view) => (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={currentBase === view.id}
                className={`landing-basecard${currentBase === view.id ? " is-active" : ""}`}
                onClick={() => setCurrentBase(view.id)}
              >
                <span className="landing-basecard__label">{view.label}</span>
                <strong>{view.title}</strong>
                <p>{view.description}</p>
              </button>
            ))}
          </div>

          <div className="landing-status" aria-live="polite">
            <div className="landing-status__head">
              <LuMapPinned />
              <strong>{activeView.label} 시점</strong>
            </div>
            <p>{activeView.status}</p>

            <div className="landing-status__actions">
              <button
                type="button"
                className="landing-reset"
                onClick={() => setCurrentBase("home")}
                disabled={currentBase === "home"}
              >
                <LuRefreshCcw />
                <span>홈으로 리셋</span>
              </button>

              <button
                type="button"
                className="landing-next"
                onClick={() => setCurrentBase(nextBaseId)}
              >
                <LuCrosshair />
                <span>다음 시점: {nextView.label}</span>
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
