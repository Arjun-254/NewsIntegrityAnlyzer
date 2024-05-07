import React from "react";

export default function Stats() {
  return (
    <div class="py-10 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base leading-7 text-white">AI powered triple verification</dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">
              Verify Headlines
            </dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base leading-7 text-white">
              Read more about the topic
            </dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">
              Related Articles
            </dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base leading-7 text-white">
              Verify it before you spread it
            </dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">
              Instant verification
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}