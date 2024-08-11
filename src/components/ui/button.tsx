import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  active?: boolean;
}
const Button = ({
  className,
  isLoading,
  isDisabled,
  active,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'font-atten_new font-medium text-white text-center h-10 px-6 py-2 text-sm md:text-base transition-all duration-300 hover:opacity-80',
        className,
        isLoading && 'opacity-60 cursor-wait',
        isDisabled && 'opacity-40 cursor-not-allowed',
      )}
      disabled={!!isDisabled || !!isLoading}
      {...props}
    >
      {isLoading ? (
        <div
          className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
