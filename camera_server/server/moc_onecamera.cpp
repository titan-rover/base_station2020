/****************************************************************************
** Meta object code from reading C++ file 'onecamera.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.12.6)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "onecamera.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'onecamera.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.12.6. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_oneCamera_t {
    QByteArrayData data[20];
    char stringdata0[264];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_oneCamera_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_oneCamera_t qt_meta_stringdata_oneCamera = {
    {
QT_MOC_LITERAL(0, 0, 9), // "oneCamera"
QT_MOC_LITERAL(1, 10, 12), // "requestPopup"
QT_MOC_LITERAL(2, 23, 0), // ""
QT_MOC_LITERAL(3, 24, 18), // "videoListenerIndex"
QT_MOC_LITERAL(4, 43, 12), // "requestPause"
QT_MOC_LITERAL(5, 56, 8), // "cameraId"
QT_MOC_LITERAL(6, 65, 14), // "qualityChanged"
QT_MOC_LITERAL(7, 80, 9), // "viewIndex"
QT_MOC_LITERAL(8, 90, 7), // "quality"
QT_MOC_LITERAL(9, 98, 9), // "drawFrame"
QT_MOC_LITERAL(10, 108, 7), // "cv::Mat"
QT_MOC_LITERAL(11, 116, 5), // "frame"
QT_MOC_LITERAL(12, 122, 14), // "imuDataReceive"
QT_MOC_LITERAL(13, 137, 4), // "roll"
QT_MOC_LITERAL(14, 142, 5), // "pitch"
QT_MOC_LITERAL(15, 148, 18), // "popupButtonClicked"
QT_MOC_LITERAL(16, 167, 18), // "pauseButtonClicked"
QT_MOC_LITERAL(17, 186, 20), // "qualityButtonClicked"
QT_MOC_LITERAL(18, 207, 24), // "start_rotating_clockwise"
QT_MOC_LITERAL(19, 232, 31) // "start_rotating_counterclockwise"

    },
    "oneCamera\0requestPopup\0\0videoListenerIndex\0"
    "requestPause\0cameraId\0qualityChanged\0"
    "viewIndex\0quality\0drawFrame\0cv::Mat\0"
    "frame\0imuDataReceive\0roll\0pitch\0"
    "popupButtonClicked\0pauseButtonClicked\0"
    "qualityButtonClicked\0start_rotating_clockwise\0"
    "start_rotating_counterclockwise"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_oneCamera[] = {

 // content:
       8,       // revision
       0,       // classname
       0,    0, // classinfo
      10,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       3,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    1,   64,    2, 0x06 /* Public */,
       4,    1,   67,    2, 0x06 /* Public */,
       6,    3,   70,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
       9,    1,   77,    2, 0x0a /* Public */,
      12,    2,   80,    2, 0x0a /* Public */,
      15,    0,   85,    2, 0x08 /* Private */,
      16,    0,   86,    2, 0x08 /* Private */,
      17,    0,   87,    2, 0x08 /* Private */,
      18,    0,   88,    2, 0x08 /* Private */,
      19,    0,   89,    2, 0x08 /* Private */,

 // signals: parameters
    QMetaType::Void, QMetaType::Int,    3,
    QMetaType::Void, QMetaType::QString,    5,
    QMetaType::Void, QMetaType::Int, QMetaType::QString, QMetaType::Int,    7,    5,    8,

 // slots: parameters
    QMetaType::Void, 0x80000000 | 10,   11,
    QMetaType::Void, QMetaType::Float, QMetaType::Float,   13,   14,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void oneCamera::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<oneCamera *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->requestPopup((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 1: _t->requestPause((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 2: _t->qualityChanged((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< QString(*)>(_a[2])),(*reinterpret_cast< int(*)>(_a[3]))); break;
        case 3: _t->drawFrame((*reinterpret_cast< cv::Mat(*)>(_a[1]))); break;
        case 4: _t->imuDataReceive((*reinterpret_cast< float(*)>(_a[1])),(*reinterpret_cast< float(*)>(_a[2]))); break;
        case 5: _t->popupButtonClicked(); break;
        case 6: _t->pauseButtonClicked(); break;
        case 7: _t->qualityButtonClicked(); break;
        case 8: _t->start_rotating_clockwise(); break;
        case 9: _t->start_rotating_counterclockwise(); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        {
            using _t = void (oneCamera::*)(int );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&oneCamera::requestPopup)) {
                *result = 0;
                return;
            }
        }
        {
            using _t = void (oneCamera::*)(const QString );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&oneCamera::requestPause)) {
                *result = 1;
                return;
            }
        }
        {
            using _t = void (oneCamera::*)(int , QString , int );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&oneCamera::qualityChanged)) {
                *result = 2;
                return;
            }
        }
    }
}

QT_INIT_METAOBJECT const QMetaObject oneCamera::staticMetaObject = { {
    &QWidget::staticMetaObject,
    qt_meta_stringdata_oneCamera.data,
    qt_meta_data_oneCamera,
    qt_static_metacall,
    nullptr,
    nullptr
} };


const QMetaObject *oneCamera::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *oneCamera::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_oneCamera.stringdata0))
        return static_cast<void*>(this);
    return QWidget::qt_metacast(_clname);
}

int oneCamera::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QWidget::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 10)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 10;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 10)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 10;
    }
    return _id;
}

// SIGNAL 0
void oneCamera::requestPopup(int _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void oneCamera::requestPause(const QString _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void oneCamera::qualityChanged(int _t1, QString _t2, int _t3)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
