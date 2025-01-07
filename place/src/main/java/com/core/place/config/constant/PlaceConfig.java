package com.core.place.config.constant;

public class PlaceConfig {

    public static enum placeType {
        Nature,
        History_Culture,
        Foodie,
        NightLife,
        Shopping,
        CAFFE,
    }

    public static Double PLACE_QUALITY_WEIGHT=0.3;
    public static Double PLACE_POPULARITY_WEIGHT=0.5;
    public static Double PLACE_PREFERENCE_WEIGHT=0.2;

    public static Integer START_MORNING=6;
    public static Integer END_MORNING=12;
    public static Integer START_AFTERNOON=12;
    public static Integer END_AFTERNOON=18;
    public static Integer START_EVENING=18;
    public static Integer END_EVENING=24;

    public enum Term{
        MORNING,
        AFTERNOON,
        EVENING,

    }

    public enum defaultActivity {
    RELAX_IN_CAFE,

    }
}
