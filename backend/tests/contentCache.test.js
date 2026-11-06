import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import {
    clearAllCache,
    clearCached,
    getCached,
    setCached,
} from "../services/contentCache.js";

let now;

beforeEach(() => {
    now = 1_000_000;
    clearAllCache();
    mock.method(Date, "now", () => now);
});

afterEach(() => {
    mock.restoreAll();
    clearAllCache();
});

test("a missing key returns null", () => {
    assert.equal(getCached("missing"), null);
});

test("an entry remains available until its TTL elapses", () => {
    const data = { tracks: ["track-1"] };
    setCached("search", data, 100);
    now += 99;
    assert.deepEqual(getCached("search"), data);
});

test("an entry expires exactly at its TTL boundary", () => {
    setCached("search", ["track-1"], 100);
    now += 100;
    assert.equal(getCached("search"), null);
});

test("expired entries are removed rather than revived by a clock rollback", () => {
    setCached("search", ["track-1"], 100);
    now += 101;
    assert.equal(getCached("search"), null);
    now -= 101;
    assert.equal(getCached("search"), null);
});

test("the default TTL is ten minutes", () => {
    setCached("search", "result");
    now += 10 * 60 * 1000 - 1;
    assert.equal(getCached("search"), "result");
    now += 1;
    assert.equal(getCached("search"), null);
});

test("zero and negative TTLs do not serve cached data", () => {
    setCached("zero", "result", 0);
    setCached("negative", "result", -1);
    assert.equal(getCached("zero"), null);
    assert.equal(getCached("negative"), null);
});

test("overwriting a key replaces its data and refreshes its expiry", () => {
    setCached("search", "old", 100);
    now += 90;
    setCached("search", "new", 100);
    now += 10;
    assert.equal(getCached("search"), "new");
    now += 90;
    assert.equal(getCached("search"), null);
});

test("clearing one key leaves other keys intact", () => {
    setCached("first", 1);
    setCached("second", 2);
    clearCached("first");
    clearCached("missing");
    assert.equal(getCached("first"), null);
    assert.equal(getCached("second"), 2);
});

test("clearing the cache removes every entry", () => {
    setCached("first", 1);
    setCached("second", 2);
    clearAllCache();
    assert.equal(getCached("first"), null);
    assert.equal(getCached("second"), null);
});

test("falsy cached values are preserved", () => {
    for (const value of [false, 0, ""]) {
        setCached("value", value);
        assert.equal(getCached("value"), value);
    }
});
