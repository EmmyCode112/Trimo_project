
  
  export function LoadingProgress({ progress }) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle className="stroke-muted" fill="none" strokeWidth="8" cx="50" cy="50" r="40" />
            <circle
              className="stroke-primary"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.51}, 251.2`}
              transform="rotate(-90 50 50)"
              cx="50"
              cy="50"
              r="40"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    )
  }
  
  