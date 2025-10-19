import React from 'react'

type BoundedProps = {    
    className?: string,
    children: React.ReactNode
};

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({ className, children, ...restProps }, ref) => {
        return <section
            ref={ref}
            className={`px-4 py-10 md:px-6 md:py-14 lg:py-16 ${className}`}
            {...restProps}
        >
            <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
        </section>;
    }
);

Bounded.displayName = "Bounded";

export default Bounded;