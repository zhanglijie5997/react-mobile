interface WatermarkType {
    set: (str: string) => void 
}

const watermark: WatermarkType = {
    set: (str: string) => {
        let id = setWatermark(str)
        setInterval(() => {
          if (document.getElementById(id) === null) {
            id = setWatermark(str)
          }
        }, 500)
        window.onresize = () => {
          setWatermark(str)
        }
      }
};
 
const setWatermark = (str: string) => {
  const id = '1.23452384164.123412415'
 
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id)!)
  }
  const can = document.createElement('canvas')
  can.width = 150
  can.height = 120
  const cans = can.getContext('2d')!;
  cans.rotate(-20 * Math.PI / 180)
  cans.font = '20px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
  cans.textAlign = 'left'
  cans.textBaseline = "middle"
  cans.fillText(str, can.width / 3, can.height / 2)
  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '70px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '111111111'
  div.style.width = document.documentElement.clientWidth - 100 + 'px'
  div.style.height = document.documentElement.clientHeight - 100 + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}
 
export default watermark;
