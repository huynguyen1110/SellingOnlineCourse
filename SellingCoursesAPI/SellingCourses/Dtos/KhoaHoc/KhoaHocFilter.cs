using Microsoft.AspNetCore.Mvc;
using SellingCourses.Constants;

namespace SellingCourses.Dtos.KhoaHoc
{
    public class KhoaHocFilter
    {
        private string _sapXepKhoaHoc;
        
        private int _sapXepKhoaHocTheoDanhGia;


        [FromQuery(Name = "sapXepKhoaHoc")]
        public string SapXepKhoaHocTheo
        {
            get { return _sapXepKhoaHoc; }
            set { _sapXepKhoaHoc = value; }
        }

        [FromQuery(Name = "sapXepKhoaHocTheoDanhGia")]
        public int SapXepKhoaHocTheoDanhGia
        {
            get { return _sapXepKhoaHocTheoDanhGia; }
            set { _sapXepKhoaHocTheoDanhGia = value; }
        }
    }
}
