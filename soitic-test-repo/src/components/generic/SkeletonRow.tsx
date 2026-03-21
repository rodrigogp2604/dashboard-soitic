export function SkeletonRow() {
    return (
        <div
            className="flex items-center justify-between p-5 rounded-2xl animate-pulse"
            style={{ backgroundColor: 'var(--color-surface-container)' }}
        >
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-32 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
                    <div className="h-2 w-20 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-2 items-center">
                <div className="h-3 w-16 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
                <div className="h-2 w-24 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
            </div>
            <div className="h-6 w-24 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
        </div>
    );
}