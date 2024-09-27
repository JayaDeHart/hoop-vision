type Props = {};

function BottomNav({}: Props) {
  return (
    <div className="left 0 fixed bottom-0 z-50 w-full bg-gray-200 p-2">
      <div className="mx-auto flex max-w-screen-lg items-center justify-around px-4 py-2">
        <div>Built by Jaya DeHart</div>
        <a
          className="underline underline-offset-2"
          href="https://www.github.com/JayaDeHart"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="underline underline-offset-2"
          href="https://www.linkedin.com/in/jaya-dehart"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default BottomNav;
