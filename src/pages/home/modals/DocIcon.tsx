import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DocIcon: React.FC = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    viewBox="0 0 88 100"
    {...props}
  >
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#177bf1",
        fillOpacity: 1,
      }}
      d="M0 0h88v100H0zm0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#fefefe",
        fillOpacity: 1,
      }}
      d="M0 0h88v100H0zm21.852 1.29v.198a4 4 0 0 1-.22-.015c-1.132-.04-2.085.28-3.073.808l-.301.102v.195l-.223.035c-1.77.418-3.433 2.559-4.367 4.035-.793 1.29-1.246 2.536-1.297 4.067h-.2c-.077.41-.112.797-.112 1.21v.372q-.001.204.004.406-.005.218-.004.434-.001.59.004 1.187v6.703q0 2.603.003 5.203v6.934l.008 12.969q-.299.03-.597.066c-.262.04-.489.125-.73.23-.259.106-.505.212-.77.298v.199q-.105.013-.215.031c-.918.219-1.664.887-2.332 1.523-.246.23-.246.23-.5.426-1.332 1.086-2.41 2.992-2.739 4.664v.399h-.199c-.129.894-.219 1.773-.219 2.68v.226c.004.527.055 1.035.118 1.559h.199q-.001.095-.008.195c-.008.508.004.914.207 1.39l.082.192c.102.238.211.469.316.703q.063.134.125.273c.391.829.899 1.504 1.473 2.208l.215.27c.316.386.66.741 1.082 1.019h.2c.05.144.05.144.1.296.446.368.93.649 1.497.793v.2q.281.14.562.277l.313.156c.371.16.75.239 1.148.32.125.028.25.051.38.079.097.02.19.039.292.058l-.004.332q-.007 3.985-.008 7.97l-.003 3.855q-.005 1.679-.004 3.359.001.891-.004 1.777v1.68q.001.304-.004.61c-.008 2.316-.008 2.316.625 4.527l.133.308c.734 1.625 1.57 2.989 2.824 4.262l.219.227c.379.375.672.648 1.214.757v.2a9.5 9.5 0 0 0 3.141 1.421c.25.067.25.067.477.168.672.239 1.425.211 2.133.207h.28q.47.006.934 0l.68.004h10.992c.305 0 .614 0 .918.004h16.559q4.312.005 8.629.004h10.441q.909.006 1.817 0 .327-.001.656.004c1.086 0 2.136-.004 3.203-.227v-.199q.156.011.312.016c.375-.012.641-.078.985-.211v-.2l.383-.062c1.656-.37 3.199-1.777 4.261-3.039.145-.172.145-.172.309-.328.156-.144.156-.144.234-.402l.102-.235.3-.101v-.297h.2c.097-.227.199-.453.297-.684l.09-.195c.156-.34.156-.34.21-.707h.2l.082-.32.105-.414.051-.207c.137-.528.137-.528.36-.747a7 7 0 0 0 .136-.921c.113-1.102.094-2.211.09-3.32 0-.259 0-.512.004-.77v-4.153q.005-2.344.004-4.687v-4.926q.005-3.649.004-7.293v-2.508c0-2.902 0-5.8.004-8.703q.004-4.892.003-9.785v-1.301q-.001-2.07.004-4.133v-6.617q.006-.92 0-1.84v-.746q.006-.506 0-1.011l.004-.293c-.008-.778-.195-1.375-.707-1.973-.136-.125-.136-.125-.273-.254a12 12 0 0 1-.903-.918 19 19 0 0 0-1.214-1.258 25 25 0 0 1-1.387-1.46 13 13 0 0 0-.656-.672c-.368-.36-.711-.731-1.047-1.118-.133-.152-.274-.293-.414-.433-.235-.235-.235-.235-.47-.52-.257-.32-.565-.574-.878-.84a4.7 4.7 0 0 1-.586-.664c-.164-.164-.332-.328-.496-.496-.254-.27-.5-.543-.75-.82-.32-.348-.656-.676-.996-1.008-.32-.324-.629-.664-.938-1a26 26 0 0 0-.91-.941l-.734-.72q-.415-.409-.79-.847c-.417-.476-.866-.914-1.32-1.36a27 27 0 0 1-1.957-2.1 9 9 0 0 0-1.136-1.11 2.8 2.8 0 0 1-.59-.652c-.238-.352-.527-.594-.852-.868a8 8 0 0 1-.742-.789c-.265-.308-.535-.593-.87-.828-.188-.148-.188-.148-.325-.379-.352-.578-.707-.863-1.36-1.058-.03-.102-.066-.2-.097-.301q-.299-.046-.602-.098V1.29zm0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#27d9fe",
        fillOpacity: 1,
      }}
      d="M62.656 1.29v.198c.2.032.395.067.602.098l.097.3c.13.032.13.032.258.067.617.234 1.059.734 1.34 1.32.367.399.777.743 1.184 1.102.246.219.48.45.71.684.118.113.118.113.239.222.223.235.414.465.61.723.324.418.652.797 1.085 1.113.309.266.535.563.778.887.21.262.441.488.683.726q.134.135.274.27l.144.145q.323.316.645.64l.34.332c.617.613 1.226 1.223 1.789 1.887.617.707.617.707 1.308 1.344.367.308.64.652.93 1.03.262.34.562.622.887.903.468.406.875.801 1.234 1.309.184.25.402.457.629.672.168.164.332.332.5.496.117.113.117.113.234.23.278.282.535.575.793.867.211.243.438.465.668.688q.247.251.5.496l.262.262.273.265.27.266c.215.215.414.438.61.664.448.516.94.992 1.429 1.469.55.543 1.098 1.086 1.602 1.672q.174.2.355.394c.59.633.727 1.13.703 1.985-.047.722-.305 1.113-.77 1.644-.722.613-1.367.664-2.285.668q-.186-.001-.379.004l-1.042.008q-.44.001-.887.008-1.378.01-2.762.015-.754.001-1.508.008l-3.96.012q-.493-.001-.985.004H70.48q-.285-.001-.574.004c-2.867.007-2.867.007-4.156-.524-.074-.027-.145-.058-.223-.09a14 14 0 0 1-1.574-.8q-.104-.062-.215-.125a4.7 4.7 0 0 1-1.082-.868q-.317-.312-.64-.617c-.157-.176-.157-.176-.157-.375h-.199c-.14-.18-.14-.18-.293-.414l-.16-.246-.145-.234q-.093-.142-.187-.29c-.113-.206-.113-.206-.113-.402h-.2c-.39-.843-.652-1.68-.851-2.586-.043-.187-.098-.37-.148-.558-.165-.73-.13-1.485-.13-2.227v-.515q-.004-.698-.003-1.391l-.004-.871-.004-3.043q-.001-1.418-.008-2.832-.005-1.219-.004-2.438.001-.726-.004-1.453-.006-.681 0-1.363c0-.168-.004-.336-.004-.5-.007-1.027.059-1.777.762-2.574.844-.688 1.402-.809 2.492-.766m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#0f42ce",
        fillOpacity: 1,
      }}
      d="M14.574 45.906h.672c.723 0 1.418.008 2.113.227l.239.07c.238.074.476.156.718.238q.117.042.247.082c.199.067.394.137.593.204v.199q.186.045.38.097c.628.211 1.1.59 1.616.993l.282.21c.675.524 1.203 1.094 1.714 1.774q.09.117.184.234c1.758 2.352 2.094 4.938 2.012 7.801h-.2c.004.09.012.176.016.266a4.73 4.73 0 0 1-.617 2.312q-.065.164-.137.332c-1.125 2.61-3.324 4.563-5.949 5.621-.375.137-.691.2-1.098.2v.199c-.832.183-1.636.234-2.488.234h-.383c-1.781-.023-3.531-.383-5.11-1.226v-.2c-.128-.035-.128-.035-.26-.074-.36-.133-.626-.3-.938-.52l-.235-.163-.164-.133v-.2l-.222-.07c-.332-.156-.457-.332-.676-.625-.074-.078-.153-.152-.23-.23-.676-.672-1.243-1.399-1.665-2.25-.062-.125-.062-.125-.129-.254l-.257-.512q-.137-.28-.286-.554c-.27-.575-.238-1.133-.226-1.754h-.2a14 14 0 0 1-.117-1.786v-.246c.008-.82.102-1.62.22-2.433h.198l.024-.324c.297-2.168 1.894-4.22 3.601-5.532.414-.304.832-.61 1.262-.89.086-.055.168-.114.254-.168.246-.13.246-.13.645-.13v-.198c.082-.028.16-.055.246-.082.105-.036.21-.067.32-.106.105-.035.21-.066.32-.102.301-.101.301-.101.543-.207.989-.367 2.125-.328 3.168-.324m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#ede8d2",
        fillOpacity: 1,
      }}
      d="M28.156 32.613h7.637q1.801.005 3.602.004h6.43q3.12.005 6.241.004h10.391q1.532-.001 3.063.004h4.609c.312.016.312.016.61.113l.1.2.224.128c.308.188.535.399.773.664v.2h.2c.124.37.112.718.105 1.11v.226l-.004.547h-.2l-.015.261c-.106.418-.317.63-.621.91l-.149.149c-.468.449-.777.48-1.41.48h-1.476q-.721.005-1.45.004h-1.558q-1.887.005-3.774.004l-1.777.004-5.906.004h-1.914q-3.089.001-6.172.008l-6.336.004q-1.777-.001-3.555.004c-1.011 0-2.02.003-3.031 0q-.774 0-1.543.003h-1.93c-1.074.008-2.035-.011-2.867-.773-.648-.727-.754-1.168-.734-2.14.023-.31.023-.31.12-.606h.2l.023-.223c.098-.343.239-.46.508-.691l.239-.203c.46-.348.765-.399 1.347-.399m1.297 44.434c.11-.004.11-.004.219-.004h4.242q1.519-.005 3.043-.004h10.25q3.066.001 6.133-.004h6.297q1.77.001 3.539-.004h3.008q.772.006 1.539 0h1.406c.168.004.34 0 .508 0 1.07-.004 2.047.063 2.992.621.59.641.84 1.227.824 2.098-.066.668-.383 1.11-.816 1.598l-.102.3a14 14 0 0 1-.7.297q-.047.05-.097.098a13 13 0 0 1-.683.016h-1.489q-.732.005-1.464.004-.788 0-1.575.003l-3.816.004h-1.074q-3.339.007-6.684.008h-1.937q-3.118.001-6.235.008-3.199.007-6.398.008l-3.594.004q-1.53.005-3.059.004-.783 0-1.562.003h-1.95c-1.706.016-1.706.016-2.382-.558-.617-.645-.797-1.25-.836-2.125.016-.637.152-1.176.625-1.621.2-.153.398-.29.61-.418.074-.055.144-.106.218-.156.356-.18.606-.18 1-.18m.703-29.676h.532q.73-.001 1.46.004h1.57q1.366-.001 2.727.004 1.975.005 3.942.004 3.2.001 6.394.008c2.07.004 4.145.007 6.215.007h.387q.961-.001 1.918.004 7.968.004 15.937.02v.195l.305.059c.605.172.96.629 1.285 1.14.234.637.234 1.532 0 2.168-.414.653-.937 1.16-1.691 1.399-.57.058-1.137.05-1.711.047h-.531c-.485.004-.97 0-1.454 0H62.81q-1.787-.005-3.575-.004-3.187.001-6.375-.004-3.094-.005-6.183-.004h-.77q-3.52.001-7.043-.004h-2.492q-1.518.001-3.035-.004H31.79q-.709.001-1.418-.004h-.512c-.234.004-.464 0-.699 0h-.39c-.512-.039-.91-.23-1.332-.52-.2-.238-.2-.238-.375-.495-.086-.13-.086-.13-.18-.262-.258-.422-.262-.774-.27-1.258q-.001-.193-.008-.39c.051-.555.262-.938.653-1.329q.076-.081.16-.164c.863-.668 1.691-.62 2.738-.617m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#efe9d1",
        fillOpacity: 1,
      }}
      d="M29.176 62.277h.222c.243-.004.489 0 .73 0h.532q.726-.006 1.457 0 .786.001 1.57-.004h6.661q3.391-.001 6.777.004h5.82q3.38-.005 6.754-.004h6.621c.52.004 1.035.004 1.555 0 .473 0 .95 0 1.422.004h.516c.23-.004.464 0 .699 0h.39c.325.024.547.086.836.223v.2q.106.027.219.062c.426.207.68.531.89.957.208.636.208 1.472-.062 2.093l-.148.258h-.203q-.03.117-.067.239c-.133.257-.133.257-.394.39q-.118.03-.235.067v.199c-.46.176-.843.222-1.34.222h-.218c-.243.004-.485 0-.73 0q-.265-.001-.528.004h-8.938q-.359.005-.718.004H46.324q-3.176.005-6.347.004H36.41a393 393 0 0 1-3.035 0h-1.547q-.709.006-1.418 0h-.515c-.23.004-.465 0-.696 0h-.39c-.668-.066-1.172-.25-1.61-.773q-.095-.116-.195-.23c-.5-.673-.43-1.403-.363-2.208.152-.597.496-.945.996-1.289h.199V62.5c.46-.18.848-.223 1.34-.223m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#3b72f1",
        fillOpacity: 1,
      }}
      d="m7.781 48.113.2.102c-.493.492-.989.98-1.497 1.488-.066-.035-.129-.066-.199-.101.461-.547.945-1.032 1.496-1.489m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#6f98f9",
        fillOpacity: 1,
      }}
      d="M4.09 59.027c.379.563.629 1.211.7 1.887-.368-.184-.47-.625-.599-.992a7 7 0 0 1-.101-.895m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#d7e2f5",
        fillOpacity: 1,
      }}
      d="M27.637 62.7c.066.03.133.066.199.097q-.166.176-.336.348c-.062.066-.125.128-.187.195-.176.152-.176.152-.375.152.148-.375.375-.558.699-.793m0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#44a1da",
        fillOpacity: 1,
      }}
      d="M72.434 66.07h.203c-.137.442-.328.63-.7.895l-.199-.2q.118-.058.235-.124c.27-.176.351-.278.46-.57m0 0"
    />
  </svg>
);
export default DocIcon;
